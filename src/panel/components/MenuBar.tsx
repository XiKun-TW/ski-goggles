import * as React from "react";
import { Menu, Image, Icon, Popup } from "semantic-ui-react";
import { RunTimeMessage, RunTimeMessageSubject } from "../../types/Types";
import { OPEN_OPTIONS_TAB, OPEN_ISSUES_PAGE } from "../../Constants";
import { AppVersion } from "../../Versions";
import { SendRuntimeMessage } from "../Helpers";

type Props = {
  clear: () => void;
  chromeId: string;
};

type State = {};

export default class MenuBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chromeId: "",
    };
  }

  openOptions() { SendRuntimeMessage(this.props.chromeId, OPEN_OPTIONS_TAB, {}); }

  openIssues() { SendRuntimeMessage(this.props.chromeId, OPEN_ISSUES_PAGE, {}); }

  versionInfo(): string {
    return `Version: ${AppVersion}`;
  }

  render() {
    return <Menu fixed="top" size="mini">
        <Menu.Item name="home">
            <Popup 
              trigger={<Image src="images/ski-goggles-48.png" size="mini" />}
              content={this.versionInfo()}
              size='tiny'
            />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="bug">
            <Popup
              trigger={<Icon link size="large" color="green" name="bug" onClick={this.openIssues.bind(this)} />}
              content="Report Bug/Feature Request"
              size='tiny'
            />
          </Menu.Item>
          <Menu.Item name="options">
            <Popup
              trigger={<Icon link size="large" color="green" name="options" onClick={this.openOptions.bind(this)} />}
              content="Open Options Page"
              size='tiny'
            />
          </Menu.Item>
          <Menu.Item name="clear">
            <Popup
              trigger={<Icon link size="large" color="red" name="trash" onClick={this.props.clear} />}
              content="Clear All Events"
              size='tiny'
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>;
  }
}
