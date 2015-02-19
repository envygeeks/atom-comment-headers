module.exports = {
  activate: function () {
    return atom.commands.add("atom-text-editor", {
      "comment-headers:insert": (function(that) {
        return function(event) {
          return that.insert();
        };
      })(this)
    });
  },

  insert: function () {
    var editor = atom.workspace.getActiveTextEditor();
    if (typeof(editor) !== "undefined" && editor !== null &&
          editor.getCursors().length === 1) {

      switch(editor.getGrammar().name) {
        case "C":
        case "YAML":
        case "Git Config":
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
        case "Ruby Haml":
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
