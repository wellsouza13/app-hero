import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editCategory, getCategory } from "@/services/categoryServices";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  FormContainer,
  FormLabel,
  FormInput,
  FormButton,
  ErrorMessage,
  Title,
} from "../styles";
import { CategoryForm } from "@/types/category";
import { useEffect } from "react";

const schema = yup.object().shape({
  Name: yup.string().required("Name is a required field"),
});

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CategoryForm) => {
    try {
      await editCategory(Number(id), {
        Name: data.Name,
      });
      toast.success("Category created successfully!");
      router.push("/Category");
    } catch (error: any) {
      toast.error(`${error?.response?.data?.Message}`);
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryData = await getCategory(Number(id));
        reset({
          Name: categoryData.Name,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id, reset]);
  return (
    <>
      <Title>Edit Categorie</Title>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel>
          Name:
          <FormInput type="text" {...register("Name")} />
          {errors.Name && <ErrorMessage>{errors.Name.message}</ErrorMessage>}
        </FormLabel>
        <FormButton type="submit">Update</FormButton>
      </FormContainer>
    </>
  );
}
