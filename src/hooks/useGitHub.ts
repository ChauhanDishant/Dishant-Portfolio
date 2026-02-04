import { useState, useEffect, useCallback } from "react";
import type { GitHubRepository } from "@/types";
import { FEATURED_GITHUB_REPOS } from "@/data/constants";

interface UseGitHubResult {
  repos: GitHubRepository[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGitHub(
  username: string,
  options: { sort?: string; per_page?: number } = {},
): UseGitHubResult {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { sort = "updated", per_page = 100 } = options;

  const fetchRepos = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${per_page}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data: GitHubRepository[] = await response.json();

      const filteredRepos = data.filter((repo) =>
        FEATURED_GITHUB_REPOS.includes(repo.name),
      );

      setRepos(filteredRepos);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  }, [username, sort, per_page]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
}
