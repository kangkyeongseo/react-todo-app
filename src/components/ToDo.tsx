import { ReactFragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <Button name="DOING" onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== "TO_DO" && (
        <Button name="TO_DO" onClick={onClick}>
          To Do
        </Button>
      )}
      {category !== "DONE" && (
        <Button name="DONE" onClick={onClick}>
          Done
        </Button>
      )}
    </li>
  );
}

export default ToDo;
