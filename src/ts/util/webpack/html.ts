import HtmlWebpackPlugin = require("html-webpack-plugin");

export interface HtmlPluginArgs {
    name: string;
    templateName?: string;
    chunks?: string[];
}

export interface HtmlPluginFactory {
    (args: HtmlPluginArgs): HtmlWebpackPlugin;
}