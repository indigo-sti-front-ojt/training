import React from "react";
import "./App.css";
import { InputTest0 } from "./components/InputTest0";
import { InputTest1 } from "./components/InputTest1";
import { InputTest2 } from "./components/InputTest2";

import { JSONSchema7 } from "json-schema";
import { JsonSchemaComponent } from "./components/JsonSchemaComponent";
import { InputTest3 } from "./components/InputTest3";

const schemaSample: JSONSchema7 = {
  // $id: "https://example.com/person.schema.json",
  // $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Person",
  type: "object",
  properties: {
    input: {
      type: "string",
      description: "FirstNameを入力",
    },
    textarea: {
      type: "string",
      description: "bioを入力",
    },
    integer: {
      description: "年齢を入力",
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    select: {
      description: "一つを選択してください",
      type: "string",
      enum: ["value1", "value2", "value3"],
    },
    multiselect: {
      type: "array",
      description: "複数を選択してください",
      items: {
        type: "string",
        enum: ["foo", "bar", "fuzz", "qux"],
      },
      uniqueItems: true,
    },
  },
  required: ["input", "integer"],
};

const UI_schemaSample = {
  input: {
    "ui:widget": "input",
    "ui:title": "title",
  },
  textarea: {
    "ui:widget": "textarea",
    "ui:title": "textarea",
  },
  integer: {
    "ui:widget": "number",
    "ui:title": "number title",
  },
  select: {
    "ui:widget": "radio",
    "ui:title": "title",
  },
  multiselect: {
    "ui:widget": "checkbox",
    "ui:title": "checkbox",
  },
};

const UI_Frame = {
  input: "string",
  textarea: "string",
  integer: 0,
  select: "string",
  multiselect: [],
};
function App() {
  return (
    <div className="App">
      <InputTest0 />
      <InputTest1 />
      <InputTest2 />
      <JsonSchemaComponent
        jsonSchema={schemaSample}
        UISchema={UI_schemaSample}
        UIType={UI_Frame}
      />
      <InputTest3 />
    </div>
  );
}

export default App;
