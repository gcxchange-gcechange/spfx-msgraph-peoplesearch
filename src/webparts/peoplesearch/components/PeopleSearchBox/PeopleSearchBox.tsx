import * as React from "react";

import * as strings from "PeopleSearchWebPartStrings";
import styles from "../PeopleSearchWebPart.module.scss";

import { IPeopleSearchBoxProps } from "./IPeopleSearchBoxProps";
import { IPeopleSearchBoxState } from "./IPeopleSearchBoxState";

import {
  IconButton,
  SearchBox,
  ITheme
} from "office-ui-fabric-react";

export class PeopleSearchBox extends React.Component<IPeopleSearchBoxProps,IPeopleSearchBoxState> {

  public constructor(props: IPeopleSearchBoxProps) {

    super(props);

    this.state = {
        searchInputValue: props.searchInputValue,
        showClearButton: false,
    };
  }

  private renderBasicSearchBox(): JSX.Element {
      return (
          <div className={styles.searchBoxWrapper}>
              <SearchBox
                  placeholder={strings.SearchInputPlaceholder}
                  theme={this.props.themeVariant as ITheme}
                  className={styles.searchTextField}
                  value={this.state.searchInputValue}
                  autoComplete="off"
                  onChange={(value) => this._onChange(value)}
                  onSearch={() => this._onSearch(this.state.searchInputValue)}
                  onClear={() => this._onSearch('', true)}
              />
              <div className={styles.searchButton}>
                  {this.state.searchInputValue &&
                      <IconButton
                          aria-label={strings.SearchButton}
                          onClick={() => this._onSearch(this.state.searchInputValue)}
                          iconProps={{ iconName: 'Forward' }}
                      />
                  }
              </div>
          </div>
      );
  }

  /**
   * Handler when a user enters new keywords
   * @param queryText The query text entered by the user
   */
  public async _onSearch(queryText: string, isReset: boolean = false) {

      // Don't send empty value
      if (queryText || isReset) {

          let query = queryText;

          this.setState({
              showClearButton: !isReset
          });

          // Notify the dynamic data controller
          this.props.onSearch(query);
      }
  }

  public _onChange(value) {
      this.setState({
          searchInputValue: value
      });
      if (this.state.searchInputValue.length >= 2) {
        this._onSearch(this.state.searchInputValue);  
      }
  }

  public render(): React.ReactElement<IPeopleSearchBoxProps> {
      return (
          <div className={styles.searchBox}>
              {this.renderBasicSearchBox()}
          </div>
      );
  }
}
