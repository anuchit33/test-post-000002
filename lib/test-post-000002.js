'use babel';

import TestPost000002View from './test-post-000002-view';
import { CompositeDisposable } from 'atom';

export default {

  testPost000002View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testPost000002View = new TestPost000002View(state.testPost000002ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testPost000002View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-post-000002:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testPost000002View.destroy();
  },

  serialize() {
    return {
      testPost000002ViewState: this.testPost000002View.serialize()
    };
  },

  toggle() {
    console.log('TestPost000002 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
