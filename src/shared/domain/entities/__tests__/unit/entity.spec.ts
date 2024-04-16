import { validate as uuidValidate } from 'uuid';

import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props: StubProps = { prop1: 'value', prop2: 10 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should accept a valid uuid', () => {
    const props: StubProps = { prop1: 'value', prop2: 10 };
    const id = '06a4e8df-2211-440b-89ab-3e67487dfb1a';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('Should convert a entity to a JavaScript Object', () => {
    const props: StubProps = { prop1: 'value', prop2: 10 };
    const id = '06a4e8df-2211-440b-89ab-3e67487dfb1a';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({ id, ...props });
  });
});
