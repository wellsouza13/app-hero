import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCategory, getAllCategory } from "@/services/categoryServices";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  FormContainer,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormButton,
  ErrorMessage,
  Title,
} from "./styles";
import { CategoryForm } from "@/types/category";

const schema = yup.object().shape({
  Name: yup.string().required("Name is a required field"),
});

export default function CreateCategory() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CategoryForm) => {
    try {
      await createCategory({
        Name: data.Name,
      });
      toast.success("Category created successfully!");
      router.push("/Category");
    } catch (error: any) {
      toast.error(`${error?.response?.data?.Message}`);
    }
  };
  return (
    <>
      <Title>Create Categorie</Title>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel>
          Name:
          <FormInput type="text" {...register("Name")} />
          {errors.Name && <ErrorMessage>{errors.Name.message}</ErrorMessage>}
        </FormLabel>
        <FormButton type="submit">Create</FormButton>
      </FormContainer>
    </>
  );
}
