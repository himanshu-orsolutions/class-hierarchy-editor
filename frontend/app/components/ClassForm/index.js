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
import { successToast, errorToast } from 'utils/toast';
import { string, number, boolean, object } from 'yup';
import styles from './styles.scss';
import { startLoadingTreeData } from 'containers/HierarchyViewer/actions';

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
          <InputLabel htmlFor="name">Class Name</InputLabel>
          <OutlinedInput
            id="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
          />
          <FormHelperText>{touched.name ? errors.name : ''}</FormHelperText>
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
          value="abstract"
          control={
            <Checkbox
              defaultChecked
              color="primary"
              id="abstract"
              value={values.abstract}
              onChange={handleChange}
              error={touched.title && Boolean(errors.abstract)}
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
  mapPropsToValues: ({ name, pid, abstract, cid }) => ({
    cid: cid || undefined,
    name: name || undefined,
    pid: pid || undefined,
    abstract: abstract || false,
  }),

  validationSchema: object().shape({
    cid: number()
      .typeError('cid must be integer value')
      .required('Class ID is required')
      .integer('cid must be integer value'),

    name: string()
      .required('Class name is required')
      .matches(/^[A-Z][a-zA-Z0-9]*$/, 'Invalid class name'),
    pid: number()
      .typeError('cid must be integer value')
      .integer('Pid must be integer value'),
    abstract: boolean(),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const data = {
      cid: values.cid,
      name: values.name,
      abstract: values.abstract,
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
          props.dispatch(startLoadingTreeData(0));
        })
        .catch(error => {
          if (error.response && error.response.data) {
            errorToast(error.response.data.message);
          } else {
            errorToast('Error occured while adding new class!!');
          }
          setSubmitting(false);
        });
    } else if (props.type.toLowerCase() === 'edit') {
      data.taskId = props.taskId;
      axios
        .put(`cheditor/api/editclass/${values.cid}`, data)
        .then(() => {
          successToast('Class updated successfully');
          props.setIsFormOpen(false);
          props.dispatch(startLoadingTreeData(0));
        })
        .catch(error => {
          if (error.response && error.response.data) {
            errorToast(error.response.data.message);
          } else {
            errorToast('Error occured while updating the class!!');
          }
          setSubmitting(false);
        });
    }
  },
})(ClassForm);

export default Formik;
