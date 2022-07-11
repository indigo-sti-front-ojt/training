import { memo, FC } from "react";
import { Drawer, DrawerBody, DrawerOverlay, Button } from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

export const MenuDrawer: FC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickSetting,
    onClickUserManagement,
  } = props;
  
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerBody p={0} bg="gray.100">
          <Button w="100%" onClick={onClickHome}>
            TOP
          </Button>
          <Button w="100%" onClick={onClickUserManagement}>
            ユーザー一覧
          </Button>
          <Button w="100%" onClick={onClickSetting}>
            設定
          </Button>
        </DrawerBody>
      </DrawerOverlay>
    </Drawer>
  );
});
