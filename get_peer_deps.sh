#!/bin/bash

package_name="next-auth"  # Change this to the package you want

versions=$(npm view $package_name versions --json | jq -r '.[]')

for version in $versions; do
  echo "Version: $version"
  npm view $package_name@$version peerDependencies --json || echo "  No peerDependencies"
  echo ""  # Add an empty line for separation
done