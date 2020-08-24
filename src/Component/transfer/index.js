import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import { get, filter } from "lodash";
import { getListAccount } from "../../Redux/Action/userAction";
import { transferMoney } from "../../Redux/Action/paymentAction";
import { toast } from "react-toastify";

function Transfer() {
  const [listAccount, setListAccount] = useState([]);
  useEffect(() => {
    getListAccount().then((res) => {
      if (res.error) return;
      const { data } = res;
      const list = (
        filter(
          get(data, "accounts"),
          (item) => item.account_type !== "saving"
        ) || []
      ).map((account) => account.account_id);
      setListAccount(list);
    });
  }, []);

  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    if (data.receiveBankID === window.AppConfigs.bankID) {
      delete data.receiveBankID;
      transferMoney(data)
        .then((res) => {
          if (get(res, "data.error")) {
            return toast.error(get(res, "data.error.message"));
          }
          toast.success("Transfer successfully");
          reset();
        })
        .catch((err) => {
          toast.error(
            get(err, "response.data.error") || "Something went wrong"
          );
        });
    } else {
      toast.error("Beneficiary Bank not exist");
    }
  };

  const validateAmountMoney = (value) => {
    return true;
  };

  return (
    <div className="transfer-padding">
      <div className="transfer-body">
        <form className="transfer-head" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="transfer-h1">VNBC TRANSFER MONEY</h1>
          <hr></hr>
          <div className="transfer-body">
            <label>Select your account</label>
            <select
              className="input-field"
              name="deposit_account_id"
              ref={register({ required: true })}
            >
              {listAccount.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
            {errors.deposit_account_id &&
              errors.deposit_account_id.type === "required" && (
                <p className="transfer-error">Please enter this field!</p>
              )}
            <label>Beneficiary Bank ID</label>
            <input
              className="input-field"
              type="text"
              name="receiveBankID"
              ref={register({ required: true })}
            />
            {errors.receiveBankID &&
              errors.receiveBankID.type === "required" && (
                <p className="transfer-error">Please enter this field!</p>
              )}
            <label>Beneficiary Account </label>
            <input
              className="input-field number-none-arrow"
              type="number"
              name="receive_account_id"
              ref={register({ required: true })}
            />
            {errors.receive_account_id &&
              errors.receive_account_id.type === "required" && (
                <p className="transfer-error">Plese enter this field!</p>
              )}
            <label>Amount Of Money </label>
            <input
              className="input-field"
              type="number"
              min="10"
              name="amount"
              ref={register({
                required: true,
                validate: validateAmountMoney,
              })}
            />
            {errors.amount && (
              <p className="transfer-error">Please enter this field!</p>
            )}

            <label> Message </label>
            <textarea name="message" ref={register} />
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
