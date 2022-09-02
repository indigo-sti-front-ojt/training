import { db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ImagesDBType } from "../types/ImagesDBType";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ImageContainer } from "../provider/ImageProvider";
import { LodingContainer } from "../provider/LoadingProvider";

export const useImage = () => {
  const { setImageDataList, imageEditFlag, setImageEditFlag } =
    ImageContainer.useContainer();

  const { setLoging } = LodingContainer.useContainer();

  const imageDataCreate = async (data: ImagesDBType) => {
    const dataDoc = collection(db, "images");
    await addDoc(dataDoc, { url: data.url, fullPath: data.fullPath });
    setImageEditFlag(!imageEditFlag);
  };
  const imageDataDelete = async (data: ImagesDBType) => {
    // console.log("firestore delete");
    const target = doc(db, "images", data.uid);
    await deleteDoc(target);
    setImageEditFlag(!imageEditFlag);
  };

  const imageDataReads = async () => {
    const target = collection(db, "images");
    const dataResults = getDocs(target);
    const tempDataList: ImagesDBType[] = [];
    (await dataResults).forEach((doc) => {
      const temp: ImagesDBType = {
        uid: doc.id,
        url: doc.data().url,
        fullPath: doc.data().fullPath,
      };
      tempDataList.push(temp);
    });
    setImageDataList(tempDataList);
  };

  const imageUpload = async (fileName: string, file: File) => {
    setLoging(true);
    const storageRef = ref(storage, `images/${fileName}`);
    try {
      const result = await uploadBytes(storageRef, file);
      // console.log(result.metadata.fullPath);
      const url = await getDownloadURL(result.ref);
      const temp: ImagesDBType = {
        uid: "",
        url: url,
        fullPath: result.metadata.fullPath,
      };
      await imageDataCreate(temp);
      setLoging(false);
      return true;
    } catch (e) {
      return false;
    }
  };
  const imageDelete = async (data: ImagesDBType) => {
    console.log("image delete");
    setLoging(true);
    const storageRef = ref(storage, data.fullPath);
    try {
      // firestorage delete
      await deleteObject(storageRef);
      // firesotre delete
      await imageDataDelete(data);
      setLoging(false);
      return true;
    } catch {
      return false;
    }
  };

  return { imageUpload, imageDataReads, imageDelete };
};
