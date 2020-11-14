export default (target: {}, ...arrayAppOrProps: Array<{ _module: string | null, app: {} | null, parent: {} | null }>): void => {
  let props: { app: {} | null, parent: { app: {} | null, _module: string | null } | null } = {};
  arrayAppOrProps.forEach((appOrProps) => {
    if (appOrProps && appOrProps._module) {
      if (appOrProps._module === 'app') {
        props.app = appOrProps;
      } else {
        props.parent = appOrProps;
        if (props.parent && props.parent.app && props.parent._module === 'app') {
          props.app = props.parent.app;
        }
      }
    } else {
      props = {
        ...props,
        ...appOrProps,
      };
    }
  });
  Object.assign(target, props);
};
