import { Editor } from "@tiptap/react";
import ButtonEdition from "./ButtonEdition";
import { FaBold } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaStrikethrough } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import type { ReactNode } from "react";
import { useEditorState } from "../../hooks/useEditorState";

interface MenuEditionProps {
  id: string;
  editor: Editor | null;
}

interface TypographysProps {
  typography: string;
  icon?: ReactNode;
  action: (editor: Editor) => void;
  isActive: boolean;
}

function MenuEdition({ id, editor }: MenuEditionProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isHorizontalRule: ctx.editor.isActive("horizontalRule") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const typographys: TypographysProps[] = [
    {
      typography: "Gras",
      icon: <FaBold size={10} />,
      action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
      isActive: editorState?.isBold ?? false,
    },
    {
      typography: "Italique",
      icon: <FaItalic />,
      action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
      isActive: editorState?.isItalic ?? false,
    },
    {
      typography: "Souligné",
      icon: <FaUnderline />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleUnderline().run(),
      isActive: editorState?.isUnderline ?? false,
    },
    {
      typography: "Barré",
      icon: <FaStrikethrough />,
      action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
      isActive: editorState?.isStrike ?? false,
    },
    // {
    //   typography: "Code",
    //   icon: <FaCode />,
    //   action: (editor: Editor) => editor.chain().focus().toggleCode().run(),
    //   isActive: editorState?.isCode ?? false,
    // },
    {
      typography: "Bloc de code",
      icon: <FaCode />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleCodeBlock().run(),
      isActive: editorState?.isCodeBlock ?? false,
    },
    {
      typography: "Liste à puces",
      icon: <FaListUl />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleBulletList().run(),
      isActive: editorState?.isBulletList ?? false,
    },
    {
      typography: "Liste numérotée",
      icon: <FaListOl />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleOrderedList().run(),
      isActive: editorState?.isOrderedList ?? false,
    },
    {
      typography: "Ligne horizontale",
      icon: <FaMinus />,
      action: (editor: Editor) =>
        editor.chain().focus().setHorizontalRule().run(),
      isActive: editorState?.isHorizontalRule ?? false,
    },
    {
      typography: "Annuler",
      icon: <IoArrowBack />,
      action: (editor: Editor) => editor.chain().focus().undo().run(),
      isActive: editorState?.canUndo ?? false,
    },
    {
      typography: "Rétablir",
      icon: <IoArrowForward />,
      action: (editor: Editor) => editor.chain().focus().redo().run(),
      isActive: editorState?.canRedo ?? false,
    },
  ];

  return (
    <div
      id={`MenuEdition__container__${id}`}
      className="w-full px-2 h-15 bg-green-200 rounded-t-xl flex gap-2 items-center overflow-scroll"
    >
      {typographys.map((typography) => (
        <ButtonEdition
          id={`ButtonEdition__${typography.typography}__${id}`}
          key={typography.typography}
          typography={typography.typography}
          editor={editor}
          action={typography.action}
          isActive={typography.isActive}
          icon={typography.icon}
        />
      ))}
    </div>
  );
}

export default MenuEdition;