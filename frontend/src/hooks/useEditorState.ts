import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";

export function useEditorState<T>({
  editor,
  selector,
}: {
  editor: Editor | null;
  selector: (context: { editor: Editor }) => T;
}) {
  const [state, setState] = useState<T | null>(() =>
    editor ? selector({ editor }) : null
  );

  useEffect(() => {
    if (!editor) {
      return;
    }

    const onUpdate = () => {
      setState(selector({ editor }));
    };

    editor.on("transaction", onUpdate);

    return () => {
      editor.off("transaction", onUpdate);
    };
  }, [editor, selector]);

  return state;
}
