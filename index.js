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
  
  // -------------------------------------------------------------------------

  insert: function () {
    var editor = atom.workspace.getActiveTextEditor();
    if (typeof(editor) !== "undefined" && editor !== null &&
          editor.getCursors().length === 1) {

      switch(editor.getGrammar().name) {
        case "SQL":
          this.insertCommentHeader(editor, "--");
          break;
        
        case "Clojure":
        case "Scheme":
        case "Lisp":
          this.insertCommentHeader(editor, ";; ");
          break;

        case "RSpec":
        case "C":
        case "YAML":
        case "Dockerfile":
        case "CoffeeScript":
        case "Git Config":
        case "Null Grammar":
        case "Ruby on Rails":
        case "Shell Script (Bash)":
        case "Shell Script":
        case "Plain Text":
        case "Python":
        case "C++":
        case "Ruby":
        case "Nginx":
          this.insertCommentHeader(editor, "# ");
          break;

	      case "Go":
        case "SASS":
        case "Less":
        case "Ruby Haml":
        case "JavaScript":
        case "Babel ES6 JavaScript":
        case "JavaScript (JSX)":
       	case "TypeScript (JSX)":
       	case "TypeScript":
        case "SCSS":
        case "PHP":
          this.insertCommentHeader(editor, "// ");
          break;
      }
    }
  },

  // -------------------------------------------------------------------------

  insertCommentHeader: function (editor, start) {
    var width = atom.config.get("editor.preferredLineLength") || 80,
        x = editor.getCursors()[0].getBufferPosition().column ||  0,
        length = start.length + x, total_length = width - length;

    if (total_length > 0) {
      str = new Array(Number(width - length) || 80).join("-");
      editor.insertText(start + str   );
    }
  }
};
