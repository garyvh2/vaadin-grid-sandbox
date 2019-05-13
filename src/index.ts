/**
 * Utils
 */
import { customElement, css, LitElement, html, CSSResult, TemplateResult, property } from "lit-element";

/**
 * Component Importings
 */
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import { GridElement } from "@vaadin/vaadin-grid/src/vaadin-grid";

@customElement('grid-demo')
class GridDemo extends LitElement {
    @property({ type: Object })
    draggedItem

    static get styles(): CSSResult {
        return css``
    }

    /**
     * Invoked on each update to perform rendering tasks. 
     * This method must return a lit-html TemplateResult. 
     * Setting properties inside this method will not trigger the element to update.
     */
    render(): TemplateResult {
        return html`
            <vaadin-grid rows-draggable @grid-dragstart="${this.dragStart}" @grid-dragend="${this.dragEnd}" @grid-drop="${this.drop}">
                <vaadin-grid-column header="ID" path="id"></vaadin-grid-column>
                <vaadin-grid-column header="Title" path="title"></vaadin-grid-column>
            </vaadin-grid>
        `
    }

    get grid(): GridElement {
        return <unknown>this.shadowRoot.querySelector('vaadin-grid') as GridElement | null;
    }

    firstUpdated() {
        this.grid.items = [{
            id: 1,
            title: "Title 1"
        }, {
            id: 2,
            title: "Title 2"
        }, {
            id: 3,
            title: "Title 3"
        }, {
            id: 4,
            title: "Title 4"
        }, {
            id: 5,
            title: "Title 5"
        }, {
            id: 6,
            title: "Title 6"
        }, {
            id: 7,
            title: "Title 7"
        }]
    }

    dragStart(event) {
        this.draggedItem = event.detail.draggedItems[0];
        this.grid.dropMode = 'between';
    };

    dragEnd() {
        this.draggedItem = this.grid.dropMode = null;
    }

    drop(event) {
        const dropTargetItem = event.detail.dropTargetItem;
        if (this.draggedItem && this.draggedItem !== dropTargetItem) {
            // Reorder the items
            const items = this.grid.items.filter(item => item !== this.draggedItem);
            const dropIndex = items.indexOf(dropTargetItem) + (event.detail.dropLocation === 'below' ? 1 : 0);
            items.splice(dropIndex, 0, this.draggedItem);
            this.grid.items = items;
        }
    }
}