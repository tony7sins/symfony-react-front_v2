import React from 'react'
import classNames from 'classnames'

export const renderField = ({ input, label, type, meta: { error }, propError }) => {
    const classes = classNames(
        'form-control',
        {
            'is-invalid': (error !== undefined || propError !== undefined) && propError !== {}
        }
    )
    return (
        <div className="form-group">
            {(label !== null && label !== '') && <label >{label}</label>}
            {type !== 'textarea' && <input {...input} type={type} className={classes} />}
            {type === 'textarea' && <textarea {...input} className={classes} />}
            {error && <div className="mb-2 mt-2 w-100 alert alert-danger">{error}</div>}
        </div>)
}