# React hCaptcha Component

## Introduction
`react-hcaptcha-component` is a simple React component that allows easy integration of hCaptcha into your web application. 
hCaptcha is an image-based verification service used to prevent spam and automated attacks on websites.

## Installation
You can install `react-hcaptcha-component` via npm or yarn:

```bash
npm install react-hcaptcha-component
# or
yarn add react-hcaptcha-component
```

## Use:

```tsx
import React from 'react';
import  { HCaptcha } from 'react-hcaptcha-component';

const MyComponent = () => {
  const siteKey = 'your-hcaptcha-site-key';
  const onVerify = (token) => {
    console.log('hCaptcha token:', token);
  };

  return (
    <div>
      <h1>My hCaptcha Protected Form</h1>
      <form>
        <HCaptcha siteKey={siteKey} onVerify={onVerify} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyComponent;

```

## Props:

`siteKey` (string, required): Your hCaptcha site key.

`onVerify` (function, required): A function called when the hCaptcha token has been successfully verified.

## Author:
Copyright 2024 mia nguyen x thind9xdev

 Licensed under the MIT License