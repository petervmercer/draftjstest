import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator} from 'draft-js';


function findSubEntries(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'SUP'
            );
        },
        callback
    );
}

const Sup = (props) => {

    return (
        <sup>
            {props.children}
        </sup>
    );
};

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};


class SupEditorExample extends Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findSubEntries,
                component: Sup
            }
        ])

        this.state = {
            editorState: EditorState.createEmpty(decorator)
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(JSON.stringify(convertToRaw(content)));
        };

        this.addSup = this._addSup.bind(this);
    }

        _addSup(e) {
            e.preventDefault();
            const {editorState} = this.state;
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'SUP',
                'MUTABLE'
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
            this.setState({
                editorState: RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                )
            }, () => {
                setTimeout(() => this.refs.editor.focus(), 0);
            });

        }

        render() {
            return (
                <div>
                    <button style={styles.button} onMouseDown={this.addSup}>
                        Sup
                    </button>
                    <div style={styles.editor} onClick={this.focus}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            placeholder="Enter some text..."
                            ref="editor"
                        />
                    </div>
                    <input
                        onClick={this.logState}
                        style={styles.button}
                        type="button"
                        value="Log State"
                    />
                </div>
            );
        }







}





export default SupEditorExample;
