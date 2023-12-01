import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Plus, Minus } from "react-feather";
import { useState } from "react";
import GridTable from "components/grid-tables/gridTable";

function W4Form({ control, errors }) {
  const details =[
    { name: 'type', label: 'State/Federal', placeholder: 'State/Federal', type: 'select' },
    { name: 'filing_status', label: 'Filing Status', required: false, type: 'select', placeholder: 'Filing Status' },
    { name: 'two_jobs', label: 'Two Jobs', required: false, type: 'select', placeholder: 'Two Jobs' },
    { name: 'dependent_amount', label: 'Dependent Amount', placeholder: 'Dependent Amount' },
    { name: 'other_income', label: 'Other Income', placeholder: 'Other Income' },
    { name: 'extra_withholding', label: 'Extra Withholding', placeholder: 'Extra Withholding' },
    { name: 'is_exempt', label: 'Is Exempt', type: 'select', placeholder: 'Is Exempt' },
    { name: 'total_allowances', label: 'Total Allowances', placeholder: 'Total Allowances' },
    { name: 'deductions', label: 'Deductions', placeholder: 'Deductions' }]
  const federal = [
      {filling_status: 'Single', two_jobs: 'Yes', dependent_amount: '$30000.00', is_exempt: 'True', created_date: '09/23/2023', status: 'Active', actions: "Update W4"}
    ]
  const state = [
      {state: 'CA', filling_status: 'Single', two_jobs: 'Yes', dependent_amount: '$30000.00', is_exempt: 'True', created_date: '09/23/2023', status: 'Active', actions: "Update W4"}
    ]
  const [formData, setFormData] = useState([details]);

  const addNewForm = () => {
    console.log('formData', formData.length)
    const newform = details.map(obj => {return { ...obj, name: formData.length + "_" + obj.name };});
    setFormData((prevData) => [
      ...prevData,
      newform,
    ]);
  };

  const removeForm = (form) => {
    if (form === 0) {
      return
    }
    setFormData((prevData) => prevData.filter((data, index) => index !== form));
  };

  const federalColumns = [
    {
        headerName: "Filling Status",
        sortable: true,
        field: "filling_status"
    },
    {
        headerName: "Two Jobs",
        sortable: true,
        field: "two_jobs"
    },
    {
        headerName: "Dependent Amount",
        sortable: true,
        field: "dependent_amount"
    },
    {
      headerName: "Is Exempt",
      sortable: true,
      field: "is_exempt"
    },

    {
      headerName: "Created Date",
      sortable: true,
      field: "created_date"
    },
    {
      headerName: "Status",
      sortable: true,
      field: "status"
    },
    {
      headerName: "Actions",
      sortable: true,
      field: "actions"
    }
  ];

  const stateColumns = [
    {
      headerName: "State",
      sortable: true,
      field: "state"
    },
    {
        headerName: "Filling Status",
        sortable: true,
        field: "filling_status"
    },
    {
        headerName: "Two Jobs",
        sortable: true,
        field: "two_jobs"
    },
    {
        headerName: "Dependent Amount",
        sortable: true,
        field: "dependent_amount"
    },
    {
      headerName: "Is Exempt",
      sortable: true,
      field: "is_exempt"
    },

    {
      headerName: "Created Date",
      sortable: true,
      field: "created_date"
    },
    {
      headerName: "Status",
      sortable: true,
      field: "status"
    },
    {
      headerName: "Actions",
      sortable: true,
      field: "actions"
    }
  ];

  return (
    <div>
      <Row className="ms-1 mb-2">Reminder: Kindly provide both the Federal and Resident W4 forms.</Row>
      <Form>
        {
          formData.map((form, formindex) => (
            <div>
              {formindex > 0 && <Row><Col xl="8">Bank {formindex+1}</Col><Col className="text-end" xl="4">
              <Button color="white" onClick={() => {
                removeForm((formindex));
              }}>
                    <Minus />
                  </Button>
                  </Col></Row>}
            <Row>
              {form.map((formField) => (
                <Col xl="4" key={formField.name}>
                  {formField.type !== 'check' && <Label className="form-lable-font text-black"
                    style={{ fontSize: "14px", fontWeight: "400" }}>
                    {formField.label}{formField.required && '*'}
                  </Label>}
                  {formField.type === 'select' ? (
                    <Controller
                      name={formField.name}
                      control={control}
                      rules={{ required: formField.required && `${formField.label} is required` }}
                      render={({ field }) => (
                        <ReactSelect {...field} isClearable />
                      )}
                    />
                  ) : formField.type === 'date' ? (
                    <Controller
                      name={formField.name}
                      control={control}
                      rules={{ required: formField.required && `${formField.label} is required` }}
                      render={({ field }) => (
                        <Input
                          type="date"
                          className="p-2"
                          placeholder={formField.placeholder}
                          invalid={errors[`${formField.name}`] && formField.required && true}
                          {...field}
                        />
                      )}
                    />
                  ) : formField.type === 'check' ? (
                    <Controller
                      name={formField.name}
                      control={control}
                      rules={{ required: formField.required && `${formField.label} is required` }}
                      render={({ field }) => (
                        <div className="m-4">
                          <Input
                            type="checkbox"
                            className="p-2"
                            placeholder={formField.placeholder}
                            invalid={errors[`${formField.name}`] && formField.required && true}
                            {...field}
                          />
                          <Label
                            className="text-black"
                            style={{ fontSize: "14px", fontWeight: "400", marginLeft: "10px" }}
                          >
                            {formField.label}
                          </Label>
                        </div>
                      )}
                    />
                  ) : (
                    <Controller
                      name={formField.name}
                      control={control}
                      rules={{ required: formField.required && `${formField.label} is required` }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="p-2"
                          placeholder={formField.placeholder}
                          invalid={errors[`${formField.name}`] && formField.required && true}
                          {...field}
                        />
                      )}
                    />
                  )}
                  {errors[`${formField.name}`] && formField.required && (
                    <span style={{ color: "red" }}>
                      {errors[`${formField.name}`].message as React.ReactNode}
                    </span>
                  )}
                </Col>
              ))}
            </Row>
            </div>
          ))
        }
      </Form>
      <div className="form-lable-font text-black mb-4 mt-2">Federal W4's</div>
      <GridTable rowData={federal} columnDefs={federalColumns} pageSize={4} searchText={undefined}/>
      <div className="form-lable-font text-black mb-4">Resident W4's</div>
      <GridTable rowData={state} columnDefs={stateColumns} pageSize={4} searchText={undefined}/>
    </div>
  );
}

export default W4Form;
