import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./app.component.scss');

/**
 * Modern left navbar built with Lit-Element
 * @event selected - Dispatches a CustomEvent nav item is selected. Selected item is stored in detail of Custom event
 * @cssprop --bg-color - Background color
 * @cssprop --bg-color-hover - Background color when hovered
 * @cssprop --color - text color
 * @cssprop --color-hover - text color when hovered
 * @cssprop --color-selected - text color when item is selected
 * @cssprop --item-width - Width of nav items
 * @cssprop --item-height - Height of nav items
 * @cssprop --margin-top - Margin to the top
 * @cssprop --min-width - Width of button
 * @cssprop --position - Possible change position attribute
 * @cssprop --primary-color - Change primary color easily
 * @cssprop --shadow-x - Shadow-x of button
 * @cssprop --shadow-y - Shadow-y of button
 */
@customElement('bronco-left-navbar')
export class BroncoLeftNavbar extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  /**
   * Takes an array to set the nav items of this components
   * @type {string[]}
   * @memberof BroncoLeftNavbar
   */
  @property()
  navItems = ['Home', 'Components', 'Documentation', 'Get started', 'Account'];

  /**
   * Sets selected item. Default is first item
   * @type {string}
   * @memberof BroncoLeftNavbar
   */
  @property()
  selectedItem = this.navItems[0];

  getClassMap(item: string) {
    const classInfo = { listItem: true, selected: this.selectedItem === item };
    return classInfo;
  }

  emit(selectedItem: string) {
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: selectedItem,
        bubbles: true
      })
    );
  }

  render() {
    return html`
                    <ul>
                      ${this.navItems.map(item => html`
                      <li @click=${() => {
                  this.selectedItem = item;
                  this.emit(item);
                  }}

                        class=${classMap(this.getClassMap(item))}>
                        ${item}

                      </li>
                      `)}
                    </ul>
`;
  }

}
