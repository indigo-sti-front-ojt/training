import React from "react";

import { withTheme } from "@rjsf/core";
import { Theme } from "@rjsf/material-ui/v5";
import { JSONSchema7 } from "json-schema";

export const TestSample = () => {
  // React v16.9以上では非推奨
  const Form = withTheme(Theme);

  //   受け取りの型が不明
  const handleChange = (formData: unknown) => {
    console.log(formData);
  };
  //   受け取りの型が不明
  const handleSubmit = (formData: unknown) => {
    console.log(formData);
  };
  const schema: JSONSchema7 = {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        default: "Chuck",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  };
  const uischema = {
    firstName: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:autocomplete": "family-name",
    },
    lastName: {
      "ui:emptyValue": "",
      "ui:autocomplete": "given-name",
    },
    age: {
      "ui:widget": "updown",
      "ui:title": "Age of person",
      "ui:description": "(earthian year)",
    },
    bio: {
      "ui:widget": "textarea",
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!",
    },
    date: {
      "ui:widget": "alt-datetime",
    },
    telephone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  };
  const formData = {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
  };

  return (
    <>
      <div>test</div>
      <Form
        uiSchema={uischema}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        schema={schema}
        liveValidate
      />
    </>
  );
};
