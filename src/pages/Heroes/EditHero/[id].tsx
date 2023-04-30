import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editHeroe, getHeroe } from "@/services/heroesServices";
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
} from "../styles";
import { useEffect } from "react";

const schema = yup.object().shape({
  Name: yup.string().required("Name is a required field"),
  CategoryId: yup.object().shape({
    value: yup.string().required("Category ID value is a required field"),
    label: yup.string().required("Category ID label is a required field"),
  }),
  Active: yup.boolean().required("Active is a required field"),
});

export default function EditHero() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<HeroesForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: HeroesForm) => {
    try {
      const response = await editHeroe(Number(id), {
        Active: data.Active,
        CategoryId: Number(data.CategoryId.value),
        Name: data.Name,
      });
      toast.success("Hero updated successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(`${error.response.data.Message}`);
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const heroData = await getHeroe(Number(id));
        reset({
          Name: heroData.Name,
          CategoryId: {
            value: String(heroData.CategoryId),
            label: heroData.Category.Name,
          },
          Active: heroData.Active,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchHeroData();
    }
  }, [id, reset]);
  return (
    <>
      <Title>Edit Hero</Title>
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
        <FormButton type="submit">Update</FormButton>
      </FormContainer>
    </>
  );
}
