import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./app.component.scss');

/**
 * Modern left navbar built with Lit-Element
 * @event selected - Dispatches a CustomEvent when nav item is selected. Selected item is stored in detail of Custom event
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
 * @cssprop --rotation-3d - Customize the rotation of the rotation effect by changing degree (Default: 10deg)
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

  /**
   * Enable or disable the 3d effect of the list items
   * @type {boolean}
   * @memberof BroncoLeftNavbar
   */
  @property()
  effect3d = true;

  getClassMap(item: string) {
    const classInfo = { listItem: true, selected: this.selectedItem === item, effect3dli: this.effect3d };
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
                    <ul class="${this.effect3d ? 'effect3dul' : ''}">
                      ${this.navItems.map(item => html`
                      <li
                      @click=${() => {
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
