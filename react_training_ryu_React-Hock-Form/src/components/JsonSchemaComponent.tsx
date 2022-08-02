import { JSONSchema7 } from "json-schema";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ruleObject = {
  [key: string]: any;
};

export const JsonSchemaComponent = (props: {
  jsonSchema: any;
  UISchema: any;
  UIType: any;
}) => {
  const { jsonSchema, UISchema, UIType } = props;
  type UITypeRead = typeof UIType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UITypeRead>();

  const OptionReturn = (key: string) => {
    if (
      jsonSchema.properties[key]?.enum ||
      jsonSchema.properties[key]?.items?.enum
    ) {
      if (jsonSchema.properties[key]?.enum) {
        const options: string[] = jsonSchema.properties[key]?.enum;
        return options;
      } else if (jsonSchema.properties[key]?.items?.enum) {
        const options: string[] = jsonSchema.properties[key]?.items?.enum;
        return options;
      } else {
        const options: string[] = [];
        return options;
      }
    } else {
      const options: string[] = [];
      return options;
    }
  };
  const RuleReturn = (key: string) => {
    const rule: ruleObject = {};
    if (jsonSchema.properties[key]?.minimum)
      rule.min = jsonSchema.properties[key]?.minimum;
    if (jsonSchema.properties[key]?.maximum)
      rule.max = jsonSchema.properties[key]?.maximum;
    if (jsonSchema.properties[key]?.pattern)
      rule.pattern = jsonSchema.properties[key]?.pattern;
    if (jsonSchema?.required.includes(key)) {
      rule.required = true;
    }
    return rule;
  };
  const InputCreate = (key: string) => {
    const UIFlag: string = UISchema[key]["ui:widget"];
    const title: string = jsonSchema.properties[key].description;
    const options = OptionReturn(key);
    const rule = RuleReturn(key);
    console.log(rule);

    // type pattern
    switch (UIFlag) {
      case "input":
        return (
          <>
            <label htmlFor="">
              {title}
              <input type="text" {...register(key, rule)} />
            </label>
          </>
        );
      case "textarea":
        return (
          <>
            <label htmlFor="">
              {title}
              <textarea id="" {...register(key, rule)} />
            </label>
          </>
        );
      case "number":
        return (
          <>
            <label htmlFor="">
              {title}
              <input type="number" id="" {...register(key, rule)} />
            </label>
          </>
        );
      case "radio":
        return (
          <>
            {title}
            {options.map((data) => (
              <label key={data}>
                {data}
                <input
                  type="radio"
                  {...register(key)}
                  name={key}
                  value={data}
                />
              </label>
            ))}
          </>
        );
      case "checkbox":
        return (
          <>
            {title}
            {options.map((data) => (
              <label key={data}>
                {data}
                <input
                  type="checkbox"
                  {...register(key)}
                  name={key}
                  value={data}
                />
              </label>
            ))}
          </>
        );
      default:
        return <></>;
    }
  };

  const onSubmit: SubmitHandler<UITypeRead> = (data) => console.log(data);

  return (
    <>
      <div>Test</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(UISchema).map((key) => (
          <div key={key}>{InputCreate(key)}</div>
        ))}
        <input type="submit" />
      </form>
    </>
  );
};
