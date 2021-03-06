/** @format */

import { utilityCapitalizeFirst, throwIfError } from '../../utilities';
import { pathExists, copy, mkdirs, writeFile } from 'fs-extra';
import { createRoute } from './templates/createRoute';

export const createComponentRouting = async (name: string): Promise<void> => {
  if (!name) throw new Error('You must include a component name.');
  const formattedName = utilityCapitalizeFirst(name);
  const dir = `./src/components-routing/Route${formattedName}`;
  const localDir = `${__dirname}/templates/${formattedName}`;

  if (await pathExists(dir)) console.error(`\x1b[31m`, `A component ${formattedName} already exists.`);

  if (await pathExists(localDir)) return copy(localDir, `./src/components-routing/${formattedName}`).catch(() => {});

  await mkdirs(dir);

  writeFile(`${dir}/index.tsx`, createRoute(formattedName), throwIfError);
};
