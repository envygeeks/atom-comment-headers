// ----------------------------------------------------------------------------
// Copyright 2014 Jordon Bedwell, Apache 2.0 License.
// ----------------------------------------------------------------------------

module.exports = {

  // --------------------------------------------------------------------------
  // Setup the command, so that it can be run over and over to insert comment
  // headers... and by comment headers I mean the shit above this comment
  // that makes the comment a little easier to notice and read IMO. Though be
  // warned that bad comment parsers confuse this shit with -- headers.
  // --------------------------------------------------------------------------

  activate: function () {
    return atom.workspaceView.command("comment-headers:insert",
      (function (that) {
        return function() {
          return that.insert();
        };
      })(this));
  },

  // --------------------------------------------------------------------------
  // Discovers the current lines buffer position and then subtracts it from 79
  // and then goes on from there to insert the type of comment header required.
  // --------------------------------------------------------------------------

  insert: function () {
    var editor = atom.workspace.getActiveEditor();
    // Don't make drastic assumptions that everything is ok.
    if (typeof(editor) !== "undefined" && editor !== null &&
          editor.getCursors().length === 1) {

      var x = editor.getCursors()[0].getBufferPosition().column,
        lang = editor.getGrammar().name;

      switch(lang) {
        case "Python": this.poundComment(x, editor, lang); break;
        case "JavaScript": this.slashComment(x, editor, lang); break;
        case "Ruby": this.poundComment(x, editor, lang); break;
      }
    }
  },

  // --------------------------------------------------------------------------
  // Inserts a slash style comment header.
  // Right now I ignore lang.
  // --------------------------------------------------------------------------

  slashComment: function (x, editor) {
    var str = new Array(77 - x).join("-");
    editor.insertText("// " + str);
  },

  // --------------------------------------------------------------------------
  // Inserts a pound style comment header.
  // Right now I ignore lang.
  // --------------------------------------------------------------------------

  poundComment: function (x, editor) {
    var str = new Array(78 - x).join("-");
    editor.insertText("# " + str);
  }
};
