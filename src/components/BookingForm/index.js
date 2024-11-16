import React from 'react';

import "../Modal/modal.css";

const index = (props) => {
    const { name, shortName, showHeader, inputFormData, updateForm, error, showDetails, toggleCheckbox, style } = props;
    const firstPerson = ["shipper", "consignee"];
    const mandatoryField = ["address1", "city", "state", "country", "name", "postal", "email", "phone", "openTime", "closeTime"];
    const mapper = {
        "exportRecord": 1,
        "importRecord": 2
    }

    const renderValue = (val, suffix) => {
        return inputFormData[val + '_' + suffix];
    }

    const checkMandatoryField = (name) => {
        if (mandatoryField.includes(name)) return true;
    }

    const isInValid = (name, field_name) => {
        return error && checkMandatoryField(field_name) && !renderValue(name, field_name);
    }

    return (
        <div className={`book-modal-items item--${name}`} style={style}>
            {showHeader && <div className='form-note'>
                <span className={`custom-checkbox international-checkbox ${showDetails && showDetails.includes(mapper[name]) ? 'checked' : ''}`} onClick={() => toggleCheckbox(mapper[name])}></span>
                <span className='info'>*{name === "exportRecord" ? "Exporter" : "Importer"} different from {name === "exportRecord" ? "Shipper" : "Consignee"}</span>
            </div>}
            {(!showDetails || showDetails.includes(mapper[name])) && (
                <div className='book-modal-container'>
                    <span className="book-modal-items--head">{shortName}</span>
                    <div className="form-field">
                        <span>Address Line 1{checkMandatoryField("address1") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'address1') ? "field--invalid" : ""}`} placeholder="Line 1" type="text" name={`${name}_address1`} onChange={updateForm} value={renderValue(name, 'address1')} />
                    </div>

                    <div className="form-field">
                        <span>Address Line 2{checkMandatoryField("address2") && "*"}</span>
                        <span>:</span>
                        <input placeholder="Line 2" type="text" name={`${name}_address2`} onChange={updateForm} value={renderValue(name, 'address2')} />
                    </div>

                    <div className="form-field">
                        <span>City{checkMandatoryField("city") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'city') ? "field--invalid" : ""}`} type="text" name={`${name}_city`} onChange={updateForm} value={renderValue(name, 'city')} />
                    </div>

                    <div className="form-field">
                        <span>State{checkMandatoryField("state") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'state') ? "field--invalid" : ""}`} type="text" name={`${name}_state`} onChange={updateForm} value={renderValue(name, 'state')} />
                    </div>

                    <div className="form-field">
                        <span>Country{checkMandatoryField("country") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'country') ? "field--invalid" : ""}`} type="text" name={`${name}_country`} onChange={updateForm} value={renderValue(name, 'country')} />
                    </div>

                    <div className="form-field">
                        <span>Name{checkMandatoryField("name") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'name') ? "field--invalid" : ""}`} type="text" name={`${name}_name`} onChange={updateForm} value={renderValue(name, 'name')} />
                    </div>

                    <div className="form-field">
                        <span>Postal{checkMandatoryField("postal") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'postal') ? "field--invalid" : ""}`} name={`${name}_postal`} onChange={updateForm} value={renderValue(name, 'poatal')} />
                    </div>

                    <div className="form-field">
                        <span>Email{checkMandatoryField("email") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, 'email') ? "field--invalid" : ""}`} type="text" name={`${name}_email`} onChange={updateForm} value={renderValue(name, 'email')} />
                    </div>

                    <div className="form-field">
                        <span>Fax{checkMandatoryField("fax") && "*"}</span>
                        <span>:</span>
                        <input type="text" name={`${name}_fax`} onChange={updateForm} value={renderValue(name, 'fax')} />
                    </div>

                    <div className="form-field">
                        <span>Phone{checkMandatoryField("phone") && "*"}</span>
                        <span>:</span>
                        <input type="number" className={`li-i ${isInValid(name, "phone") ? "field--invalid" : ""}`} name={`${name}_phone`} onChange={updateForm} value={renderValue(name, 'phone')} />
                    </div>

                    {firstPerson.includes(name) && <div className="form-field">
                        <span>Instruction{checkMandatoryField("instruction") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, "instruction") ? "field--invalid" : ""}`} type="text" name={`${name}_instruction`} onChange={updateForm} value={renderValue(name, 'instruction')} />
                    </div>}

                    {firstPerson.includes(name) && <div className="form-field time-field">
                        <span>Open Time{checkMandatoryField("openTime") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, "openTime") ? "field--invalid" : ""}`} type="time" placeholder='00:00:00' name={`${name}_openTime`} onChange={updateForm} value={renderValue(name, 'openTime')} />
                    </div>}

                    {firstPerson.includes(name) && <div className="form-field time-field">
                        <span>Close Time{checkMandatoryField("closeTime") && "*"}</span>
                        <span>:</span>
                        <input className={`li-i ${isInValid(name, "closeTime") ? "field--invalid" : ""}`} type="time" placeholder='00:00:00' name={`${name}_closeTime`} onChange={updateForm} value={renderValue(name, 'closeTime')} />
                    </div>}
                </div>
            )}
        </div>
    )
}

export default index;