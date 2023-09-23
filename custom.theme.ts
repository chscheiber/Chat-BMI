import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #0f455c
		'--color-primary-50': '219 227 231', // #dbe3e7
		'--color-primary-100': '207 218 222', // #cfdade
		'--color-primary-200': '195 209 214', // #c3d1d6
		'--color-primary-300': '159 181 190', // #9fb5be
		'--color-primary-400': '87 125 141', // #577d8d
		'--color-primary-500': '15 69 92', // #0f455c
		'--color-primary-600': '14 62 83', // #0e3e53
		'--color-primary-700': '11 52 69', // #0b3445
		'--color-primary-800': '9 41 55', // #092937
		'--color-primary-900': '7 34 45', // #07222d
		// secondary | #287094
		'--color-secondary-50': '223 234 239', // #dfeaef
		'--color-secondary-100': '212 226 234', // #d4e2ea
		'--color-secondary-200': '201 219 228', // #c9dbe4
		'--color-secondary-300': '169 198 212', // #a9c6d4
		'--color-secondary-400': '105 155 180', // #699bb4
		'--color-secondary-500': '40 112 148', // #287094
		'--color-secondary-600': '36 101 133', // #246585
		'--color-secondary-700': '30 84 111', // #1e546f
		'--color-secondary-800': '24 67 89', // #184359
		'--color-secondary-900': '20 55 73', // #143749
		// tertiary | #acbbc6
		'--color-tertiary-50': '243 245 246', // #f3f5f6
		'--color-tertiary-100': '238 241 244', // #eef1f4
		'--color-tertiary-200': '234 238 241', // #eaeef1
		'--color-tertiary-300': '222 228 232', // #dee4e8
		'--color-tertiary-400': '197 207 215', // #c5cfd7
		'--color-tertiary-500': '172 187 198', // #acbbc6
		'--color-tertiary-600': '155 168 178', // #9ba8b2
		'--color-tertiary-700': '129 140 149', // #818c95
		'--color-tertiary-800': '103 112 119', // #677077
		'--color-tertiary-900': '84 92 97', // #545c61
		// success | #64ce89
		'--color-success-50': '232 248 237', // #e8f8ed
		'--color-success-100': '224 245 231', // #e0f5e7
		'--color-success-200': '216 243 226', // #d8f3e2
		'--color-success-300': '193 235 208', // #c1ebd0
		'--color-success-400': '147 221 172', // #93ddac
		'--color-success-500': '100 206 137', // #64ce89
		'--color-success-600': '90 185 123', // #5ab97b
		'--color-success-700': '75 155 103', // #4b9b67
		'--color-success-800': '60 124 82', // #3c7c52
		'--color-success-900': '49 101 67', // #316543
		// warning | #f4cd0b
		'--color-warning-50': '253 248 218', // #fdf8da
		'--color-warning-100': '253 245 206', // #fdf5ce
		'--color-warning-200': '252 243 194', // #fcf3c2
		'--color-warning-300': '251 235 157', // #fbeb9d
		'--color-warning-400': '247 220 84', // #f7dc54
		'--color-warning-500': '244 205 11', // #f4cd0b
		'--color-warning-600': '220 185 10', // #dcb90a
		'--color-warning-700': '183 154 8', // #b79a08
		'--color-warning-800': '146 123 7', // #927b07
		'--color-warning-900': '120 100 5', // #786405
		// error | #cf2a2a
		'--color-error-50': '248 223 223', // #f8dfdf
		'--color-error-100': '245 212 212', // #f5d4d4
		'--color-error-200': '243 202 202', // #f3caca
		'--color-error-300': '236 170 170', // #ecaaaa
		'--color-error-400': '221 106 106', // #dd6a6a
		'--color-error-500': '207 42 42', // #cf2a2a
		'--color-error-600': '186 38 38', // #ba2626
		'--color-error-700': '155 32 32', // #9b2020
		'--color-error-800': '124 25 25', // #7c1919
		'--color-error-900': '101 21 21', // #651515
		// surface | #d4d4ce
		'--color-surface-50': '249 249 248', // #f9f9f8
		'--color-surface-100': '246 246 245', // #f6f6f5
		'--color-surface-200': '244 244 243', // #f4f4f3
		'--color-surface-300': '238 238 235', // #eeeeeb
		'--color-surface-400': '225 225 221', // #e1e1dd
		'--color-surface-500': '212 212 206', // #d4d4ce
		'--color-surface-600': '191 191 185', // #bfbfb9
		'--color-surface-700': '159 159 155', // #9f9f9b
		'--color-surface-800': '127 127 124', // #7f7f7c
		'--color-surface-900': '104 104 101' // #686865
	}
};
