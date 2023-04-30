import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createHeroe } from "@/services/heroesServices";
import AsyncSelect from "@/components/AsyncSelect";
import { getAllCategory } from "@/services/categoryServices";
import { HeroesForm } from "@/types/heroes";

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

const schema = yup.object().shape({
  Name: yup.string().required("Name is a required field"),
  CategoryId: yup.object().shape({
    value: yup.string().required("Category ID value is a required field"),
    label: yup.string().required("Category ID label is a required field"),
  }),
  Active: yup.boolean().required("Active is a required field"),
});

export default function CreateHero() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HeroesForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: HeroesForm) => {
    try {
      const response = await createHeroe({
        Active: data.Active,
        CategoryId: Number(data.CategoryId.value),
        Name: data.Name,
      });
      toast.success("Hero created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(`${error.response.data.Message}`);
    }
  };
  return (
    <>
      <Title>Create Hero</Title>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel>
          Name:
          <FormInput type="text" {...register("Name")} />
          {errors.Name && <ErrorMessage>{errors.Name.message}</ErrorMessage>}
        </FormLabel>
        <FormSelect>
          <FormLabel>Category:</FormLabel>
          <Controller
            name="CategoryId"
            control={control}
            render={({ field }) => (
              <AsyncSelect {...field} fetchOptions={getAllCategory} />
            )}
          />
          {errors.CategoryId && (
            <ErrorMessage>{errors.CategoryId?.message}</ErrorMessage>
          )}
        </FormSelect>
        <FormCheckbox>
          <FormInput type="checkbox" {...register("Active")} />
          <FormLabel>Active</FormLabel>
          {errors.Active && (
            <ErrorMessage>{errors.Active.message}</ErrorMessage>
          )}
        </FormCheckbox>
        <FormButton type="submit">Create</FormButton>
      </FormContainer>
    </>
  );
}
