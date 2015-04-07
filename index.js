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
        case "SQL":
          this.insertCommentHeader(editor, "--");
        break;

        case "C":
        case "YAML":
        case "CoffeeScript":
        case "Git Config":
        case "Null Grammar":
        case "Ruby on Rails":
        case "Dockerfile":
        case "Shell Script (Bash)":
        case "Shell Script":
        case "Plain Text":
        case "Python":
        case "C++":
        case "Ruby":
        case "nginx":
          this.insertCommentHeader(editor, "# ");
        break;

        case "SASS":
        case "LESS":
        case "Ruby Haml":
        case "JavaScript":
        case "SCSS":
        case "PHP":
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
