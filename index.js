module.exports = {
  activate: function () {
    return atom.workspaceView.command("comment-headers:insert",
      (function (that) {
        return function() {
          return that.insert();
        };
      })(this));
  },

  insert: function () {
    var editor = atom.workspace.getActiveEditor();
    // Don't make drastic assumptions that everything is ok.
    if (typeof(editor) !== "undefined" && editor !== null &&
          editor.getCursors().length === 1) {

      switch(editor.getGrammar().name) {
        case "C":
        case "YAML":
        case "Null Grammar":
        case "Ruby on Rails":
        case "Shell Script (Bash)":
        case "Plain Text":
        case "Python":
        case "C++":
        case "Ruby":
          this.insertCommentHeader(editor, "# ");
        break;

        case "SASS":
        case "LESS":
        case "JavaScript":
        case "SCSS":
          this.insertCommentHeader(editor, "// ");
        break;
      }
    }
  },

  insertCommentHeader: function (editor, start) {
    var width = atom.config.get("editor.preferredLineLength"),
        x = editor.getCursors()[0].getBufferPosition().column,
        lgnth = start.length + x;

    str = new Array(width - lgnth).join("-");
    editor.insertText(   start   +   str   );
  }
};
