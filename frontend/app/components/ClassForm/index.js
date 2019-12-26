import React from 'react';
import { withFormik, Form } from 'formik';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { string, number, boolean, object } from 'yup';
import styles from './styles.scss';
import { successToast } from 'utils/toast';

function ClassForm({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  type,
  setIsFormOpen,
}) {
  return (
    <div className={styles.container}>
      <h2>{type} class</h2>
      <Form className="form">
        <FormControl variant="outlined">
          <InputLabel htmlFor="cid">Class ID</InputLabel>
          <OutlinedInput
            id="cid"
            value={values.cid}
            onChange={handleChange}
            error={touched.cid && Boolean(errors.cid)}
          />
          <FormHelperText>{touched.cid ? errors.cid : ''}</FormHelperText>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="className">Class Name</InputLabel>
          <OutlinedInput
            id="className"
            value={values.className}
            onChange={handleChange}
            error={touched.className && Boolean(errors.className)}
          />
          <FormHelperText>
            {touched.className ? errors.className : ''}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="pid">Parent ID</InputLabel>
          <OutlinedInput
            id="pid"
            value={values.pid}
            onChange={handleChange}
            error={touched.pid && Boolean(errors.pid)}
          />
          <FormHelperText>{touched.pid ? errors.pid : ''}</FormHelperText>
        </FormControl>
        <FormControlLabel
          value="isAbstract"
          control={
            <Checkbox
              defaultChecked
              color="primary"
              id="isAbstract"
              value={values.isAbstract}
              onChange={handleChange}
              error={touched.title && Boolean(errors.isAbstract)}
            />
          }
          label="Abstract"
          labelPlacement="start"
        />

        <div className="save-edit-btn">
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            disabled={isSubmitting}
            variant="contained"
            onClick={() => setIsFormOpen(false)}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
}

const Formik = withFormik({
  mapPropsToValues: ({ className, pid, isAbstract, cid }) => ({
    cid: cid || undefined,
    className: className || undefined,
    pid: pid || undefined,
    isAbstract: isAbstract || false,
  }),

  validationSchema: object().shape({
    cid: number()
      .typeError('cid must be integer value')
      .required('Class ID is required')
      .integer('cid must be integer value'),

    className: string()
      .required('Class name is required')
      .matches(/^[A-Z][a-zA-Z0-9]*$/, 'Invalid class name'),
    pid: number()
      .typeError('cid must be integer value')
      .integer('Pid must be integer value'),
    isAbstract: boolean(),
  }),

  handleSubmit: (values, { props }) => {
    const data = {
      cid: values.cid,
      name: values.className,
      abstract: values.isAbstract,
      pid: values.pid,
    };

    if (props.type.toLowerCase() === 'add') {
      axios
        .get('cheditor/api/addclass', {
          params: { ...data },
        })
        .then(() => {
          successToast('New class added successfully');
          props.setIsFormOpen(false);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (props.type.toLowerCase() === 'edit') {
      data.taskId = props.taskId;
      // props.dispatch(startEditTodoAction(data));
    }
  },
})(ClassForm);

export default Formik;
