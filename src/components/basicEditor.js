import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';


class BasicEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});

        /*

        var test = '{"blocks":[{"key":"3h6ei","text":"This is a BOLD test","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":10,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}';

        var blocks = convertFromRaw(JSON.parse(test));
        this.state = {editorState: EditorState.createWithContent(blocks)};
         */
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));

        const content = this.state.editorState.getCurrentContent();
        console.log(JSON.stringify(convertToRaw(content)));
    }

    _onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'ITALIC'
        ));

        const content = this.state.editorState.getCurrentContent();
        console.log(JSON.stringify(convertToRaw(content)));
    }
    render() {
        return (
            <div className="App">


                <div className="editor">
                    <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                    <button onClick={this._onItalicClick.bind(this)}>Italic</button>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                    />

                </div>
            </div>
        );
    }

}

export default BasicEditor;