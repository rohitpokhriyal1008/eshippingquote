import React from 'react'

const FCLItemContainer = (props) => {
    const { commodites, updateForm, error } = props;
    return (
        <div className="item-container">
            <div className="item-container-heading">
                Containers For FCL
            </div>
            <div className="item-container-content">
                <div className="item-list">
                    {commodites.map((item, index) => (
                        <div className="item-list-detail fcl-list-detail">
                            <div className="item-list-field item-type-no">
                                <span>Item No.</span>
                                <input disabled value={index + 1} />
                            </div>
                            <div className="item-list-field item-type-text">
                                <span>Container description*</span>
                                <input className={`li-i ${error && !item.description ? "field--invalid" : ""}`} value={item.description} name="description" onChange={e => updateForm(e, index)} />
                            </div>
                            <div className="item-list-field item-type-text country-field">
                                <span>Country Of Origin</span>
                                <input value={item.countryOfOrigin} placeholder='CO' name="countryOfOrigin" onChange={e => updateForm(e, index)} />
                            </div>
                            <div className="item-list-field item-type-number qty-field">
                                <span>Qty</span>
                                <input disabled value={`${item.quantity} Qty`} />
                            </div>
                            <div className="item-list-field item-type-number">
                                <span>Weight</span>
                                <input disabled value={`${item.weight.value} ${item.weight.unit}`} />
                            </div>
                            <div className="item-list-field item-type-number">
                                <span>Size</span>
                                <input disabled value={`${item.containerSize}`} />
                            </div>
                            <div className="item-list-field item-type-number">
                                <span>Declared Value:</span>
                                <input value={item.value?.value ? item.value.value : ''} type='number' placeholder='Worth (In USD)' name="value" onChange={e => updateForm(e, index)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FCLItemContainer