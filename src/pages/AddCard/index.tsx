import { useForm } from "react-hook-form";
import validator from "validator";

import { useState } from "react";

import CreditCard from "../../components/CreditCard";

import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

import "./style.scss";

type PropsCard = {
  number: string;
  name: string;
  date: string;
  password: string;
};

const Addcard = () => {
  const [card, setCard] = useState<PropsCard | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropsCard>({
    defaultValues: {
      date: "",
      name: "",
      number: "",
      password: "",
    },
  });

  const onSubmit = (data: PropsCard) => {
    setCard(data);
    console.log(data);
    reset();
  };

  const isAlphaWithSpaces = (value: string) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  const isDateValid = (value: string) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    return regex.test(value);
  };

  return (
    <div className="app">
      <div className="container">
        <CreditCard />

        <div className="form-group">
          <div className="form-control">
            <label htmlFor="number">Número do cartão:</label>
            <input
              className={errors?.number && "input-error"}
              type="text"
              placeholder="Digite o número do cartão"
              {...register("number", {
                required: true,
                maxLength: 16,
                minLength: 16,
                validate: (value) => validator.isCreditCard(value),
              })}
            />
            {errors?.number?.type === "required" && (
              <p className="error-message">Número é obrigatório</p>
            )}
            {errors?.number?.type === "validate" && (
              <p className="error-message">Número inválido</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="name">Nome do titular</label>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome como está no cartão"
              {...register("name", {
                required: true,
                validate: (value) => isAlphaWithSpaces(value),
              })}
            />
            {errors?.name?.type === "required" && (
              <p className="error-message">Nome é obrigatório</p>
            )}
          </div>

          <div className="form-itens">
            <div className="form-control date">
              <label htmlFor="date">Validade</label>
              <input
                className={errors?.date && "input-error"}
                type="text"
                placeholder="mm/aa"
                {...register("date", {
                  required: true,
                  maxLength: 5,
                  minLength: 5,
                  validate: (value) => isDateValid(value),
                })}
              />
              {errors?.date?.type === "required" && (
                <p className="error-message">Data é obrigatória</p>
              )}
              {errors?.date?.type === "validate" && (
                <p className="error-message">A data é inválida </p>
              )}
            </div>

            <div className="form-control password">
              <label htmlFor="password">
                <span>CVV</span>
              </label>
              <input
                className={errors?.password && "input-error"}
                type="password"
                placeholder="***"
                {...register("password", {
                  required: true,
                  maxLength: 3,
                  minLength: 3,
                  validate: (value) => validator.isInt(value),
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="error-message">A senha é obrigatória</p>
              )}
            </div>
          </div>
        </div>

        <div className="securitys">
          <IoShieldCheckmarkSharp />
          <p>Seus dados estão seguros</p>
        </div>
      </div>

      <button
        type="submit"
        onClick={() => handleSubmit(onSubmit)()}>
        Adicionar cartão
      </button>
    </div>
  );
};

export default Addcard;
