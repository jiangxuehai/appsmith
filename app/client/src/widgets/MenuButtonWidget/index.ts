import Widget from "./widget";
import IconSVG from "./icon.svg";
import { ButtonPlacementTypes, ButtonVariantTypes } from "components/constants";
import { MenuItemsSource } from "./constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "Menu button",
  iconSVG: IconSVG,
  tags: [WIDGET_TAGS.BUTTONS],
  defaults: {
    label: "Open Menu",
    menuVariant: ButtonVariantTypes.PRIMARY,
    placement: ButtonPlacementTypes.CENTER,
    isCompact: false,
    isDisabled: false,
    isVisible: true,
    animateLoading: true,
    menuItemsSource: MenuItemsSource.STATIC,
    menuItems: {
      menuItem1: {
        label: "First Menu Item",
        id: "menuItem1",
        widgetId: "",
        isVisible: true,
        isDisabled: false,
        index: 0,
      },
      menuItem2: {
        label: "Second Menu Item",
        id: "menuItem2",
        widgetId: "",
        isVisible: true,
        isDisabled: false,
        index: 1,
      },
      menuItem3: {
        label: "Third Menu Item",
        id: "menuItem3",
        widgetId: "",
        isVisible: true,
        isDisabled: false,
        index: 2,
      },
    },
    rows: 4,
    columns: 16,
    widgetName: "MenuButton",
    version: 1,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    styleConfig: Widget.getPropertyPaneStyleConfig(),
    stylesheetConfig: Widget.getStylesheetConfig(),
    autocompleteDefinitions: Widget.getAutocompleteDefinitions(),
    setterConfig: Widget.getSetterConfig(),
  },
  autoLayout: {
    defaults: {
      rows: 4,
      columns: 6.632,
    },
    autoDimension: {
      width: true,
    },
    widgetSize: [
      {
        viewportMinWidth: 0,
        configuration: () => {
          return {
            minWidth: "120px",
            maxWidth: "360px",
            minHeight: "40px",
          };
        },
      },
    ],
    disableResizeHandles: {
      vertical: true,
      horizontal: true,
    },
  },
};

export default Widget;
