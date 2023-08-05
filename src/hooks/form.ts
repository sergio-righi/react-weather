import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export type FormValues = {
  [key: string]: string;
};

type FormHookResult<T> = {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInput: (name: string, value: string) => void;
  onReset: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (event: SelectChangeEvent<number>) => void;
  onCustomChange: (name: string, value: any) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values: T;
};

export const useForm = <T extends FormValues>(
  initialState: T = {} as T,
  submitCallback: any = null,
  updateCallback: any = null,
  shallReset: boolean = false
): FormHookResult<T> => {
  const [values, setValues] = useState<T>(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    updateCallback && updateCallback(event.target.name, event.target.value);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    updateCallback && updateCallback(event.target.name, event.target.value);
  };

  const onDropdownChange = (event: SelectChangeEvent<number>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    updateCallback && updateCallback(event.target.name, event.target.value);
  };

  const onInput = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
    updateCallback && updateCallback(name, value);
  };

  const onCustomChange = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
    updateCallback && updateCallback(name, value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (shallReset) {
      (event.target as any).reset();
    }
    await submitCallback && submitCallback();
  };

  const onReset = () => setValues(initialState);

  return {
    onBlur,
    onInput,
    onReset,
    onChange,
    onDropdownChange,
    onCustomChange,
    onSubmit,
    values,
  };
};