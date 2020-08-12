import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './style.scss';

function Transfer() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const validateAmountMoney = (value) => {
    if (value < 1 || value > 1000) return false;
    return true;
  };

  return (
    <div className="transfer-padding">
    <div className="transfer-body">
      <form className="transfer-head" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="transfer-h1">VNBC TRANSFER MONEY</h1>
        <hr></hr>
        <div className="transfer-body">
          <label>Amount Of Money </label>
          <input
            type="number"
            min="1"
            max="1000"
            name="amountMoney"
            ref={register({
              required: true,
              validate: validateAmountMoney,
            })}
          />
          {errors.amountMoney && (
            <p className="transfer-error">Please enter this field!</p>
          )}

          <label> Message </label>
          <textarea name="message" ref={register} />

          <label>Beneficiary Bank</label>
          <input
            type="text"
            name="beneficiaryBank"
            ref={register({ required: true })}
          />
          {errors.amountMoney && errors.amountMoney.type === 'required' && (
            <p className="transfer-error">Please enter this field!</p>
          )}
          <label>Beneficiary Account </label>
          <input name="beneficiaryAccount" ref={register({ required: true })} />
          {errors.amountMoney && errors.amountMoney.type === 'required' && (
            <p className="transfer-error">Plese enter this field!</p>
          )}
        </div>
        <div className="transfer-submit">
          <input type="submit" value="S U B M I T" />
        </div>
      </form>
    </div>
    </div>
  );
}

export default Transfer;
