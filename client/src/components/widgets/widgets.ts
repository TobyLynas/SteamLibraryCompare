import React from "react";

enum WidgetSizeVariant {
    Small = "small",
    Large = "large"
}

export interface WidgetProps {
    style?: React.CSSProperties;
    variant?: `${WidgetSizeVariant}`;
}
