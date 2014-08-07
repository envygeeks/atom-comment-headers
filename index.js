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
        case "C":
        case "C++":
        case "Python":
        case "Plain Text":
        case "Ruby": this.poundComment(x, editor, lang); break;

        case "LESS":
        case "SASS":
        case "SCSS":
        case "JavaScript": this.slashComment(x, editor, lang); break;
      }
    }
  },

  slashComment: function (x, editor) {
    var str = new Array(77 - x).join("-");
    editor.insertText("// " + str);
  },

  poundComment: function (x, editor) {
    var str = new Array(78 - x).join("-");
    editor.insertText("# " + str);
  }
};
