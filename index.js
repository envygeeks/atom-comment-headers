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

      var x = editor.getCursors()[0].getBufferPosition().column,
        lang = editor.getGrammar().name;

      switch(lang) {
        case "Shell Script (Bash)":
        case "Ruby on Rails":
        case "Null Grammar":
        case "YAML":
        case "C":
        case "C++":
        case "Python":
        case "Plain Text":
        case "Ruby":
          this.poundComment(x, editor, lang); break;

        case "LESS":
        case "SASS":
        case "SCSS":
        case "JavaScript":
          this.slashComment(x, editor, lang); break;
      }
    }
  },

  // In theory this should always be a proper number.
  width: atom.config.get("editor.preferredLineLength"),
  // If it's not a proper number will blow up.

  slashComment: function (x, editor) {
    var str = new Array(this.width - x).join("-");
    editor.insertText("// " + str);
  },

  poundComment: function (x, editor) {
    var str = new Array(this.width - x).join("-");
    editor.insertText("# " + str);
  }
};
