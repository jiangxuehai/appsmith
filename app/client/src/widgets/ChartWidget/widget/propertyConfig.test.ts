/* eslint-disable @typescript-eslint/no-namespace */
import { isString, get } from "lodash";

import { styleConfig, contentConfig } from "./propertyConfig";
import type { PropertyPaneControlConfig } from "constants/PropertyControlConstants";

const config = [...contentConfig, ...styleConfig];

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePropertyPaneConfig(): R;
    }
  }
}
const validateControl = (control: Record<string, unknown>) => {
  if (typeof control !== "object") return false;
  const properties = [
    "propertyName",
    "controlType",
    "isBindProperty",
    "isTriggerProperty",
  ];
  properties.forEach((prop: string) => {
    if (!control.hasOwnProperty(prop)) {
      return false;
    }
    const value = control[prop];
    if (isString(value) && value.length === 0) return false;
  });
  return true;
};

const validateSection = (section: Record<string, unknown>) => {
  if (typeof section !== "object") return false;
  if (!section.hasOwnProperty("sectionName")) return false;
  const name = section.sectionName;
  if ((name as string).length === 0) return false;
  if (section.children) {
    return (section.children as Array<Record<string, unknown>>).forEach(
      (child) => {
        if (!validateControl(child)) return false;
      },
    );
  }
  return true;
};

expect.extend({
  toBePropertyPaneConfig(received) {
    if (Array.isArray(received)) {
      let pass = true;
      received.forEach((section) => {
        if (!validateSection(section) && !validateControl(section))
          pass = false;
      });
      return {
        pass,
        message: () => "Expected value to be a property pane config internal",
      };
    }
    return {
      pass: false,
      message: () => "Expected value to be a property pane config external",
    };
  },
});

describe("Validate Chart Widget's property config", () => {
  it("Validates Chart Widget's property config", () => {
    expect(config).toBePropertyPaneConfig();
  });

  it("Validates config when chartType is CUSTOM_FUSION_CHART", () => {
    const hiddenFn = get(
      config,
      "[0].children.[1].hidden", // propertyName: "customFusionChartConfig"
    ) as unknown as (props: any) => boolean;
    let result = true;
    if (hiddenFn) result = hiddenFn({ chartType: "CUSTOM_FUSION_CHART" });
    expect(result).toBeFalsy();
  });

  it("Validates that sections are hidden when chartType is CUSTOM_FUSION_CHART", () => {
    const hiddenFns = [
      get(config, "[0].children.[2].hidden"), // propertyName: "chartData"
      get(config, "[1].children.[4].hidden"), // propertyName: "showDataPointLabel"
      get(config, "[2].children.[1].hidden"), // propertyName: "xAxisName"
      get(config, "[2].children.[2].hidden"), // propertyName: "yAxisName"
      get(config, "[2].children.[3].hidden"), // propertyName: "labelOrientation",
    ] as unknown as ((props: any) => boolean)[];
    hiddenFns.forEach((fn) => {
      const result = fn({ chartType: "CUSTOM_FUSION_CHART" });
      expect(result).toBeTruthy();
    });
  });

  it("Validates that axis labelOrientation is visible when chartType are LINE_CHART AREA_CHART COLUMN_CHART", () => {
    const allowedChartsTypes = ["LINE_CHART", "AREA_CHART", "COLUMN_CHART"];

    const axisSection = config.find((c) => c.sectionName === "Axis");
    const labelOrientationProperty = (
      axisSection?.children as unknown as PropertyPaneControlConfig[]
    ).find((p) => p.propertyName === "labelOrientation");

    allowedChartsTypes.forEach((chartType) => {
      const result = labelOrientationProperty?.hidden?.({ chartType }, "");
      expect(result).toBeFalsy();
    });
  });

  it("validates the datasource field is required in customFusionChartConfig", () => {
    const customFusionChartConfig: any = get(config, "[0].children.[1]");
    const dataSourceValidations =
      customFusionChartConfig.validation.params.allowedKeys[1];

    expect(dataSourceValidations.params.required).toEqual(true);
    expect(dataSourceValidations.params.ignoreCase).toEqual(false);
  });
});
