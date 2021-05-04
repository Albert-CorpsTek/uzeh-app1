import { useContext, useState, useEffect } from 'react';
import { RR, RRProps } from 'src/App';

interface RRouteProps {
  path: string;
  render: JSX.Element;
  exact?: boolean;
  test?: (RRProps: RRProps) => boolean;
  go?: Function;
}

const RRoute: React.FC<RRouteProps> = ({
 path, render, exact, test, go,
}) => {
  const rr = useContext(RR);
  const [component, setComponent] = useState<JSX.Element | null>(null);
  const { history, index, current } = rr;

  useEffect(() => {
    const a = async () => {
      if (go) {
        if (test && test(rr)) {
          new Promise((r) => {
            go(r);
            setComponent(render);
          });
        } else if (test === undefined) {
          if (exact ? history[index] === path : (history[index].startsWith(path))) {
            new Promise((r) => {
              go(r);
              setComponent(render);
            });
          } else {
            setComponent(null);
          }
        } else {
          setComponent(null);
        }
      } else if (exact ? history[index] === path : history[index].startsWith(path)) {
          setComponent(render);
        } else {
          setComponent(null);
        }
    };
    a();
  }, [current]);

  return component;
};

RRoute.defaultProps = {
  exact: false,
};

export default RRoute;
