import React from 'react';
import { withFormik, Form } from 'formik';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { string, object, boolean } from 'yup';
import styles from './styles.scss';

function ClassForm({ values, touched, errors, isSubmitting, handleChange }) {
  return (
    <div className={styles.container}>
      <h2>Add class</h2>
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
          <InputLabel htmlFor="pid">Class ID</InputLabel>
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
            // onClick={() => values.dispatch(closeFormAction())}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
}

const Formik = withFormik({
  mapPropsToValues: ({ className, pid, isAbstract, cid, dispatch }) => ({
    cid: cid || '',
    className: className || '',
    pid: pid || '',
    isAbstract: isAbstract || false,
    dispatch,
  }),

  validationSchema: object().shape({
    cid: string().required('Class ID is required'),
    className: string().required('Class name is required'),
    pid: string(),
    isAbstract: boolean(),
  }),

  handleSubmit: (values, { props }) => {
    const data = {
      cid: values.cid,
      className: values.className,
      pid: values.pid,
      isAbstract: values.isAbstract,
    };

    if (props.type === 'Add') {
      // props.dispatch(startAddTodoAction(data));
    } else if (props.type === 'Edit') {
      data.taskId = props.taskId;
      // props.dispatch(startEditTodoAction(data));
    }
  },
})(ClassForm);

export default Formik;
