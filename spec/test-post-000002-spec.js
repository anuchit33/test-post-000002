'use babel';

import TestPost000002 from '../lib/test-post-000002';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TestPost000002', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('test-post-000002');
  });

  describe('when the test-post-000002:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.test-post-000002')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'test-post-000002:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.test-post-000002')).toExist();

        let testPost000002Element = workspaceElement.querySelector('.test-post-000002');
        expect(testPost000002Element).toExist();

        let testPost000002Panel = atom.workspace.panelForItem(testPost000002Element);
        expect(testPost000002Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'test-post-000002:toggle');
        expect(testPost000002Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.test-post-000002')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'test-post-000002:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let testPost000002Element = workspaceElement.querySelector('.test-post-000002');
        expect(testPost000002Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'test-post-000002:toggle');
        expect(testPost000002Element).not.toBeVisible();
      });
    });
  });
});
