import React from "react";
import { useForm } from "react-hook-form";
import { apolloClient } from "../../App";

interface IFormInput {
  from: "string";
  to: "string";
}

export function CaptureRequestForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    fetch(
      `http://localhost:3001/sampleProjectDsn/capture/${data.from}/${data.to}`,
      { method: "POST" }
    ).then(() => {
      console.log("Refetching observable queries");
      apolloClient.reFetchObservableQueries();
      console.log("Refetched");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="from" ref={register} />
      <input name="to" ref={register} />
      <input type="submit" />
    </form>
  );
}
