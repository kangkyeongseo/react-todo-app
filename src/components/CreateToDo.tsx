import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    setToDos((prev) => [
      { text: data.toDo, id: Date.now(), category: "TO_DO" },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{errors?.toDo?.message}</span>
      <input
        {...register("toDo", { required: "Pleas Write a To Do" })}
        type="text"
        placeholder="Write a To Do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
