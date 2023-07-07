import {
  ADD_LOCALE,
  DELETE_LOCALE,
  RESOLVE_LOCALES,
  UPDATE_LOCALE,
  SET_PREFERRED_LOCALE,
} from '../constants';
import reducers, { initialState } from '../reducers';

describe('i18n reducer', () => {
  it('resolves the initial state when the action is not known', () => {
    const action = {
      type: 'UNKNWON_ACTION',
    };

    const actual = reducers.i18n_locales(initialState, action);
    const expected = initialState;

    expect(actual).toEqual(expected);
  });

  it('resolves a list of locales when triggering RESOLVE_LOCALES', () => {
    const action = {
      type: RESOLVE_LOCALES,
      locales: [{ id: 1, displayName: 'French', isDefault: false }],
    };

    const actual = reducers.i18n_locales(initialState, action);
    const expected = {
      isLoading: false,
      locales: [
        {
          displayName: 'French',
          id: 1,
          isDefault: false,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('adds a locale when triggering ADD_LOCALE', () => {
    const action = {
      type: ADD_LOCALE,
      newLocale: { id: 1, displayName: 'French', isDefault: false },
    };

    const actual = reducers.i18n_locales(initialState, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'French',
          id: 1,
          isDefault: false,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('adds a locale when triggering ADD_LOCALE and set it to default', () => {
    const action = {
      type: ADD_LOCALE,
      newLocale: { id: 1, displayName: 'French', isDefault: true },
    };

    const locales = [
      {
        displayName: 'English',
        id: 2,
        isDefault: true,
      },
    ];

    const actual = reducers.i18n_locales({ ...initialState, locales }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'English',
          id: 2,
          isDefault: false,
        },
        {
          displayName: 'French',
          id: 1,
          isDefault: true,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('removes a locale when triggering DELETE_LOCALE ', () => {
    const action = {
      type: DELETE_LOCALE,
      id: 2,
    };

    const locales = [
      {
        displayName: 'French',
        id: 1,
        isDefault: true,
      },
      {
        displayName: 'English',
        id: 2,
        isDefault: false,
      },
    ];

    const actual = reducers.i18n_locales({ ...initialState, locales }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'French',
          id: 1,
          isDefault: true,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('updates a locale when triggering UPDATE_LOCALE', () => {
    const action = {
      type: UPDATE_LOCALE,
      editedLocale: { id: 1, displayName: 'Frenchie', isDefault: false },
    };

    const locales = [
      {
        displayName: 'English',
        id: 2,
        isDefault: true,
      },
      {
        displayName: 'French',
        id: 1,
        isDefault: false,
      },
    ];

    const actual = reducers.i18n_locales({ ...initialState, locales }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'English',
          id: 2,
          isDefault: true,
        },
        {
          displayName: 'Frenchie',
          id: 1,
          isDefault: false,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('updates a locale when triggering UPDATE_LOCALE and set it to default', () => {
    const action = {
      type: UPDATE_LOCALE,
      editedLocale: { id: 1, displayName: 'Frenchie', isDefault: true },
    };

    const locales = [
      {
        displayName: 'English',
        id: 2,
        isDefault: true,
      },
      {
        displayName: 'French',
        id: 1,
        isDefault: false,
      },
    ];

    const actual = reducers.i18n_locales({ ...initialState, locales }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'English',
          id: 2,
          isDefault: false,
        },
        {
          displayName: 'Frenchie',
          id: 1,
          isDefault: true,
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });

  it('sets a preferred locale when triggering SET_PREFERRED_LOCALE', () => {
    const action = {
      type: SET_PREFERRED_LOCALE,
      preferredLocale: { code: 'fr' },
    };

    const locales = [
      {
        displayName: 'English',
        id: 2,
        isDefault: true,
        code: 'en',
      },
      {
        displayName: 'French',
        id: 3,
        isDefault: false,
        code: 'fr',
      },
    ];

    const actual = reducers.i18n_locales({ ...initialState, locales }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'English',
          id: 2,
          isDefault: true,
          code: 'en',
        },
        {
          displayName: 'French',
          id: 3,
          isDefault: false,
          code: 'fr',
        },
      ],
      preferredLocale: { code: 'fr' },
    };

    expect(actual).toEqual(expected);
  });

  it('can clear the preferred locale when triggering SET_PREFERRED_LOCALE', () => {
    const action = {
      type: SET_PREFERRED_LOCALE,
      preferredLocale: null,
    };

    const locales = [
      {
        displayName: 'English',
        id: 2,
        isDefault: true,
        code: 'en',
      },
      {
        displayName: 'French',
        id: 3,
        isDefault: false,
        code: 'fr',
      },
    ];
    const preferredLocale = { code: 'fr' };

    const actual = reducers.i18n_locales({ ...initialState, locales, preferredLocale }, action);
    const expected = {
      isLoading: true,
      locales: [
        {
          displayName: 'English',
          id: 2,
          isDefault: true,
          code: 'en',
        },
        {
          displayName: 'French',
          id: 3,
          isDefault: false,
          code: 'fr',
        },
      ],
      preferredLocale: null,
    };

    expect(actual).toEqual(expected);
  });
});
