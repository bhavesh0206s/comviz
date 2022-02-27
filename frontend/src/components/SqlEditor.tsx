import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ace';

export default function SqlEditor({ value, setValue, onSubmit }) {
    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    // const onSubmit = () => {
    //     const Z = value
    //         .toLowerCase()
    //         .slice(value.indexOf('from') + 'from'.length);
    //     console.log(Z.split(' ')[1]);
    //     setQuery(Z.split(' ')[1]);
    // };

    return (
        <main className={`py-5`}>
            <label htmlFor="editor">
                <AceEditor
                    aria-label="editor"
                    mode="mysql"
                    theme="github"
                    name="editor"
                    fontSize={16}
                    minLines={15}
                    maxLines={10}
                    width="100%"
                    showPrintMargin={false}
                    showGutter
                    placeholder="Write your Query here..."
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                    }}
                    value={value}
                    onChange={onChange}
                    showLineNumbers
                />
            </label>
            <div className="pt-2">
                <button onClick={onSubmit} className="btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <title id="run">run query</title>
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                        />
                    </svg>{' '}
                    Run Query
                </button>
            </div>
        </main>
    );
}
